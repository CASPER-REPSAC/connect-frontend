import axios from "axios";

export const create_comment = async ({
  comment,
  activity_id,
  chapter_id,
  writer,
  token,
}) => {
  // payload = {comment, activityid, chapterid, writer(accessToken)};
  const payload = {
    comment,
    activityid: activity_id,
    chapterid: chapter_id,
    writer,
  };

  const res = await axios.post("/api/activities/write_comment/", payload, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const commentRes = res.data;
  return commentRes;
};
