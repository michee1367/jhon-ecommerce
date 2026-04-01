import axios from "axios";

export const useApi = () => {
    const baseURL = "" // ou ton URL réelle
  
    const getAll = async (table:string, query:string) => {
      if(!query) {
        query = ""
      }
      let {data} = await axios.get(`/api/models/records/${table}/save?per_page=200`)

      return data.data
    }
  
    const getOne = async (table:string, id:number) => {
      return await axios.get(`/api/get/${table}/${id}`)
    }
  
    const create = async (table:string, data:Record<string, string>) => {
      return await axios.post(`/api/models/insert/${table}`, {props:data})
    }
  
    const update = async (table:string, id:number, data:Record<string, string>) => {
      return await axios.post(`/api/models/update/${table}/${id}`, {props:data})
    }

    const download = async (table:string) => {
      const config = useRuntimeConfig()
      let hostName = config.public.apiUrl ;
      let url = `${hostName}/models/records/${table}/download?page=1&per_page=1000&format=excel`
      navigateTo(url, { external: true })
    }
  
    return { getAll, getOne, create, update, download }
  }
  