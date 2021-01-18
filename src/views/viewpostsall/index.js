import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import PostGrid from "../../components/postgrid/";

export default function ViewPostsAll() {
  const [postsAll, setPostsAll] = useState([]);
  let { search } = useParams();

  const urlFetchAllPosts = `${process.env.REACT_APP_API_ENDPOINT}?access_token=${process.env.REACT_APP_API_KEY}&content_type=post`;
  const urlFetchSearchResults = `${
    process.env.REACT_APP_API_ENDPOINT
  }?access_token=${process.env.REACT_APP_API_KEY}&content_type=post&query=${
    search?.split("=")[1]
  }`;

  const findEndpoint = () => {
    return search === "posts" ? urlFetchAllPosts : urlFetchSearchResults;
  };

  const callApi = (endpoint) => {
    axios
      .get(endpoint)
      .then((response) => {
        setPostsAll(response.data.items);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    callApi(findEndpoint());
  }, [search]);

  return (
    <div>
      <PostGrid postsAll={postsAll} />
    </div>
  );
}
