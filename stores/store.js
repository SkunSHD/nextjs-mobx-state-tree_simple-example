import RootModel from '../models/Root.model'

const store = RootModel.create({ lastUpdate: Date.now() });

export default store