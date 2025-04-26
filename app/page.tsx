'use client';

import { useState, useEffect } from 'react';
import LoadBalancer from './components/LoadBalancer';
import ServerStatus from './components/ServerStatus';
import { Server } from './types';

export default function Home() {
  const [servers, setServers] = useState<Server[]>([
    { id: 1, health: 100, load: 0, status: 'active' },
    { id: 2, health: 100, load: 0, status: 'active' },
    { id: 3, health: 100, load: 0, status: 'active' },
  ]);

  const [requests, setRequests] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prevServers => 
        prevServers.map(server => ({
          ...server,
          load: Math.max(0, server.load + Math.random() * 20 - 10),
          health: Math.max(0, Math.min(100, server.health + Math.random() * 10 - 2))
        }))
      );
      setRequests(prev => prev + Math.floor(Math.random() * 5));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Cloud Load Balancer Demo</h1>
        
        <div className="grid gap-8">
          <LoadBalancer servers={servers} requests={requests} />
          <div className="grid grid-cols-3 gap-4">
            {servers.map(server => (
              <ServerStatus key={server.id} server={server} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
