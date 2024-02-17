import { EndpointsEnum, api } from "."

const followApi = async (Id: string | number | undefined) => {
    const response = await api.post(`${EndpointsEnum.FOLLOW_UNFOLLOW}${Id}`)
    return response;
}

export default followApi;