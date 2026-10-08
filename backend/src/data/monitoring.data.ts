
export type ServerStatus =
  | 'UP'
  | 'DOWN'
  | 'MAINT'
  | 'DRAIN'
  | 'NO_CHECK'

export interface MonitoringServer {
  id: number
  name: string
  address: string
  status: ServerStatus
  responseTime: number | null
}

export const servers: MonitoringServer[] = [
  {
    id: 1,
    name: 'WEB-01',
    address: '192.0.2.10',
    status: 'UP',
    responseTime: 24,
  },
  {
    id: 2,
    name: 'WEB-02',
    address: '192.0.2.11',
    status: 'UP',
    responseTime: 31,
  },
  {
    id: 3,
    name: 'API-01',
    address: '192.0.2.20',
    status: 'UP',
    responseTime: 18,
  },
  {
    id: 4,
    name: 'API-02',
    address: '192.0.2.21',
    status: 'DOWN',
    responseTime: null,
  },
  {
    id: 5,
    name: 'DB-01',
    address: '192.0.2.30',
    status: 'MAINT',
    responseTime: null,
  },
  {
    id: 6,
    name: 'WEB-03',
    address: '192.0.2.12',
    status: 'DRAIN',
    responseTime: 42,
  },
  {
    id: 7,
    name: 'BACKUP-01',
    address: '192.0.2.40',
    status: 'NO_CHECK',
    responseTime: null,
  },
]
