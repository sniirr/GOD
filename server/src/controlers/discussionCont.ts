import { Message } from "../models/DiscussionModel";
import UserModel from "../models/UserModel";

export async function getDiscussion(req: any, res: any): Promise<void> {
  try {
    const result = await Message.find({
      parentType: "question",
      parentId: req.body.qid,
    })
      .populate('creator');

    res.send({ result, ok: true });
  } catch (error: any) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function addMessage(
  msgObj: any,
): Promise<any> {
  try {
    const user = await UserModel.findOne({ id: msgObj.creator?.creatorId });

    if (user) {
      const inMessage = {
        text: msgObj.text,
        parentId: msgObj.parentId,
        parentType: msgObj.parentType,
        date: new Date(),
        creator: user,
      };

      const message = new Message(inMessage);
      const res = await message.save();
      return res;
    }
    throw new Error(`No user with id ${msgObj.parentId} was found in DB`)
  } catch (err) {
    console.error(err);
    return false;
  }
}
