import adminService from "@/services/http/adminService"

export default {
    async getAll({commit}, entity) {
        const resources = await adminService.get(entity)
        commit('setAll', {entity: entity, data: resources})
    },
    async getOne({commit}, {entity, idResource, setCurrent = false}) {
        const object = await adminService.getOne(entity, idResource)
        if(setCurrent) commit('setCurrent', {entity, data: object})
    },
    async update({commit}, {entity, idResource, body, setCurrent = false}) {
        const object = await adminService.put(entity, idResource, body)
        if(setCurrent) commit('setCurrent', {entity, data: object})
    }, 
    async create({commit}, {entity, body, setCurrent = false}) {
        const object = await adminService.post(entity, body)
        if(setCurrent) commit('setCurrent', {entity, data: object})
    },
    async delete({commit}, {entity, idResource}) {
        await adminService.delete(entity, idResource)
    }
}