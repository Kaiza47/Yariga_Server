import User from "../mongodb/models/user.js";
import request from "request";
import axios from "axios";

const createChatUser = async (req, res) => {
  // try {
  //   const { name, email, avatar } = req.body;
  //   const options = {
  //     method: "PUT",
  //     url: "https://api.chatengine.io/users/",
  //     // headers: {
  //     //   "PRIVATE-KEY": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1",
  //     // },
  //     body: JSON.stringify({ username: name, secret: email, avatar: avatar }),
  //   };

  //   request(options, () => {
  //     console.log(request);
  //   });

  //   res.status(200).json();
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }

  try {
    const { name, secret } = req.body;
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username: name, secret: secret },
      { headers: { "Private-Key": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1" } }
    );

    console.log(r.body);
    return res.status(r.status).json(r.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

const getOrCreateUser = async (req,res) => {
  try {
    const { name, secret } = req.body;
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: name, secret: secret },
      { headers: { "private-key": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1" } }
    );

    console.log(r.data);

    return res.status(r.status).json(r.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
}

const getChatUser = async (req, res) => {
  try {
    const { name } = req.body;
    var options = {
      method: "GET",
      url: "https://api.chatengine.io/users/{{user_id}}/",
      headers: {
        "PRIVATE-KEY": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1",
      },
    };

    const response = request(options, () => {
      console.log(options.body);
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllChatUser = async (req, res) => {
  try {
    const r = await axios.get("https://api.chatengine.io/users/", {
      headers: { "private-key": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1" },
    });

    return res.status(r.status).json(r.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
};

export { createChatUser, getChatUser, getAllChatUser, getOrCreateUser };
