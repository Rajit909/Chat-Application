export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participant: [senderId, receiverId]
      })
    };

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      gotConversation.message.push(newMessage._id);
    };
    await gotConversation.save();

    //SOCKET IO

    return res.statu(201).json({
      message: "Message send successfully."
    })

  } catch (error) {
    console.log(error);

  }
}
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const Conversation = await Conversation.findOne({
      participant:{$all: [senderId, receiverId]}
    }).populate("message");
    return res.statu(200).json(Conversation?.message);
  } catch (error) {
    console.log(error)

  }
}