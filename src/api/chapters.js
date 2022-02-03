import axios from "axios";
export const get_chapter = async (activity_id, chapter_id) => {
  const res = await axios.get(
    `/api/activities/${activity_id}/chapter/${chapter_id}`
  );
  const chapter = res.data;

  return chapter;
};

export const submit_chapter = async ({
  subject,
  article,
  activity_id,
  authString,
  token,
}) => {
  //   activityid: "98"
  // article: "<p>test</p>"
  // authString: "ddd"
  // subject: "test1"

  const payload = {
    subject,
    article,
    activityid: activity_id,
    authString,
  };

  const res = await axios.post(`/api/activities/${activity_id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  const chapterRes = res.data;
  return chapterRes;
};

export const submit_chapter_file = async ({
  file,
  activity_id,
  chapter_id,
  token,
}) => {
  let formData = new FormData();
  formData.append("file", file);
  const fileName = file.name;

  await axios.post(
    `/api/activities/${activity_id}/chapter/${chapter_id}/upload/${fileName}/`,
    formData,
    {
      headers: {
        authorization: token,
      },
    }
  );
};
