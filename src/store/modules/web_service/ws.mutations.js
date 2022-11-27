export default {
    setAll(state, {entity, data}) {
        state[entity] = data
    },
    setCurrent(state, {entity, data}) {
        state[`current${entity}`] = data
    }
}