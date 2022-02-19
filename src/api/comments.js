import axios from "axios";

export const create_comment = async ({
  comment,
  activity_id,
  chapter_id,
  writer,
}) => {
  // payload = {comment, activityid, chapterid, writer(accessToken)};
  const payload = {
    comment,
    activityid: activity_id,
    chapterid: chapter_id,
    writer,
  };

  const res = await axios.post("/api/activities/write_comment/", payload);
  const commentRes = res.data;
  return commentRes;
};

export const delete_comment = async (commentpk) => {
  const res = await axios.post(`/api/activities/delete_comment/${commentpk}/`);
  const commentDelRes = res.data;
  return commentDelRes;
};
