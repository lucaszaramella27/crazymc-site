import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { serverConnection, serverInfo } from '../data/server';

type ApiResponse = {
  online?: boolean;
  retrieved_at?: number;
  players?: {
    online?: number;
    max?: number;
  };
  version?: {
    name_clean?: string;
    name_raw?: string;
  };
};

export type ServerStatus = {
  configured: boolean;
  loading: boolean;
  online: boolean | null;
  onlinePlayers: number | null;
  maxPlayers: number | null;
  version: string | null;
  lastUpdated: Date | null;
  error: string | null;
};

const REFRESH_INTERVAL_MS = 60_000;

const initialStatus: ServerStatus = {
  configured: serverConnection.enabled,
  loading: serverConnection.enabled,
  online: serverConnection.enabled ? null : true,
  onlinePlayers: serverConnection.enabled ? null : serverInfo.onlinePlayers,
  maxPlayers: serverConnection.enabled ? null : serverInfo.maxPlayers,
  version: serverConnection.enabled ? null : serverInfo.version,
  lastUpdated: null,
  error: null,
};

const ServerStatusContext = createContext<ServerStatus>(initialStatus);

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus>(initialStatus);

  useEffect(() => {
    if (!serverConnection.enabled) return;

    let disposed = false;
    let controller: AbortController | null = null;

    const loadStatus = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const address = encodeURIComponent(serverConnection.address);
        const endpoint = `https://api.mcstatus.io/v2/status/${serverConnection.edition}/${address}`;
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Status API respondeu ${response.status}`);

        const data = await response.json() as ApiResponse;
        if (typeof data.online !== 'boolean') throw new Error('Resposta de status inválida');
        if (disposed) return;

        setStatus({
          configured: true,
          loading: false,
          online: data.online,
          onlinePlayers: data.online ? (data.players?.online ?? 0) : 0,
          maxPlayers: data.players?.max ?? null,
          version: data.version?.name_clean ?? data.version?.name_raw ?? null,
          lastUpdated: new Date(data.retrieved_at ?? Date.now()),
          error: null,
        });
      } catch (error) {
        if (disposed || (error instanceof DOMException && error.name === 'AbortError')) return;

        setStatus((current) => ({
          ...current,
          loading: false,
          online: current.lastUpdated ? current.online : null,
          error: error instanceof Error ? error.message : 'Não foi possível consultar o servidor',
        }));
      }
    };

    void loadStatus();
    const intervalId = window.setInterval(() => void loadStatus(), REFRESH_INTERVAL_MS);

    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const value = useMemo(() => status, [status]);

  return (
    <ServerStatusContext.Provider value={value}>
      {children}
    </ServerStatusContext.Provider>
  );
}

export function useServerStatus() {
  return useContext(ServerStatusContext);
}
