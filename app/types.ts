export interface Server {
  id: number;
  health: number;
  load: number;
  status: 'active' | 'inactive' | 'error';
}

export interface LoadBalancerProps {
  servers: Server[];
  requests: number;
}

export interface ServerStatusProps {
  server: Server;
}
