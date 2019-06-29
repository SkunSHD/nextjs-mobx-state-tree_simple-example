import {types} from "mobx-state-tree";

const RootModel = types
    .model({
        lastUpdate: types.Date,
        light: false
    })
    .actions(self => {
        let timer
        function start () {
            timer = setInterval(() => {
                // mobx-state-tree doesn't allow anonymous callbacks changing data
                // pass off to another action instead
                self.update()
            }, 1000)
        }

        function update () {
            self.lastUpdate = Date.now()
            self.light = true
        }

        function stop () {
            clearInterval(timer)
        }

        return { start, stop, update }
    })

export default RootModel
