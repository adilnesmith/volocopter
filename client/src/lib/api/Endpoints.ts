const ENDPOINTS = {
  GET: {
    missions: '/missions',
  },
  POST: {
    createMission: () => "/missions",
  },
  PUT: {
    mission: (id: string, state: string) => `/missions?id=${id}&state=${state}`,

  },
  PATCH: {},
  DELETE: {
    mission: (id: string) => `/missions?id=${id}`,
  },
}

export default ENDPOINTS
