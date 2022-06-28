import { Message } from "../models/DiscussionModel";
import { User } from "../models/UserModel";

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
    const user = await User.findOne({ id: msgObj.creator?.creatorId });

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

export const setMessageLike = async (req: any, res: any) => {
  try {
    const { mid, vote } = req.body;
    const userId = req.user._id;

    const key = `likes.${userId}`;

    const message = await Message.findById(mid)
    const userVote = message.likes.get(userId)
    const resolvedVote = vote === userVote ? null : vote

    await Message.updateOne(
      { _id: mid },
      {
        $set: {
          [key]: resolvedVote,
        },
      },
    );

    res.send({ resolvedVote });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
