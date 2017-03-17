import User from '../model/User'

export const createOrUpdateMessage = async botPayload => {
	const {username, name, messageText: student} = botPayload
  const firstRow = `${student} goto`
  const secondRow = name
	try {
		return await User.findOneAndUpdate(
			{username},
			{
        'message.firstRow': firstRow,
        'message.secondRow': secondRow,
        username, name
      },
			{new: true, setDefaultsOnInsert: true, upsert: true}
		)
	} catch (error) {
		throw error
	}
}