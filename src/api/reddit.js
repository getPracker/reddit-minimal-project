const API_ROOT = 'https://www.reddit.com';
// Get subreddits
export const getSubreddits = async () =>{
    try{
        const response = await fetch(`${API_ROOT}/subreddits.json`);
        if(response && response.ok){
            const json = await response.json();
            return json.data.children.map((subreddit)=> subreddit.data);
        }
        throw new Error("NetworkError");
    }catch(err){
        console.error("Error while fetching subreddits" , err);
    }
}
// Get a subreddit posts
export const getPosts = async (subreddit) =>{
    try{
        const response = await fetch(`${API_ROOT}${subreddit}.json`);
        if(response.ok){
            const json = await response.json();
            return json.data.children.map((post)=> post.data);
        }
        throw new Error("Network Error");
    }catch(err){
        console.error("Error while fetching posts", err);
    }
}
// Get a subreddit comments
export const getComments = async(permalink)=>{
    try{
        const response = await fetch(`${API_ROOT}${permalink}.json`);
        if(response.ok){
            const json = await response.json();
            return json[1].data.children.map((comment)=> comment.data);
        }
        throw new Error("Network Error");
    }catch(err){
        console.error("Error while fetching comments", err);
    }
}