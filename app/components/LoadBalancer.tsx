import { LoadBalancerProps } from '../types';

export default function LoadBalancer({ servers, requests }: LoadBalancerProps) {
  const activeServers = servers.filter(s => s.status === 'active').length;
  const avgLoad = servers.reduce((acc, server) => acc + server.load, 0) / activeServers;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Load Balancer Status</h2>
        <div className="text-sm text-gray-600">
          Active Servers: {activeServers} / {servers.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-600">Total Requests</div>
          <div className="text-2xl font-bold text-blue-600">{requests}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-600">Average Load</div>
          <div className="text-2xl font-bold text-blue-600">{avgLoad.toFixed(1)}%</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${Math.min(100, avgLoad)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
