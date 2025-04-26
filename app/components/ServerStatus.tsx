import { ServerStatusProps } from '../types';

export default function ServerStatus({ server }: ServerStatusProps) {
  const getHealthColor = (health: number) => {
    if (health > 66) return 'text-green-500';
    if (health > 33) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Server {server.id}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          server.status === 'active' ? 'bg-green-100 text-green-800' :
          server.status === 'error' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {server.status}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-sm text-gray-600">Health</div>
          <div className={`text-lg font-semibold ${getHealthColor(server.health)}`}>
            {Math.round(server.health)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Load</div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${Math.min(100, server.load)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
