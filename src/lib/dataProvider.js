import { fetchUtils } from 'react-admin'

const apiUrl = '/api'
const httpClient = fetchUtils.fetchJson

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    }
    
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`
    
    return httpClient(url).then(({ headers, json }) => ({
      data: json.data || json,
      total: parseInt(headers.get('content-range')?.split('/').pop() || json.length, 10),
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json.data || json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`
    return httpClient(url).then(({ json }) => ({ data: json.data || json }))
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`
    
    return httpClient(url).then(({ headers, json }) => ({
      data: json.data || json,
      total: parseInt(headers.get('content-range')?.split('/').pop() || json.length, 10),
    }))
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.data?.id || json.id },
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data || json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids}),
    }
    return httpClient(`${apiUrl}/${resource}?${new URLSearchParams(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: params.ids }))
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json.data || json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids}),
    }
    return httpClient(`${apiUrl}/${resource}?${new URLSearchParams(query)}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: params.ids }))
  },
}