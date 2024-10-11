// fetch data:
const loadAllPosts = async (category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    const data = await response.json();
    displayAllPosts(data.posts);
}
// load latest posts
const loadLatestPosts = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    displayLatestPosts(data);
}


// load post by category
const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText);
}

// display posts
const displayAllPosts = (posts) => {
    const postContainer = document.getElementById('post-container');

    postContainer.innerHTML = ''
    posts.forEach(post => {
        const div = document.createElement('div')
        div.classList = " p-6 lg:p-12 flex flex-col gap-6 lg:flex-row items-center lg:items-start bg-[#F3F3F5] rounded-3xl";
        div.innerHTML = `
    <div class="indicator">
                            <span class="indicator-item badge ${post.isActive ? 'bg-green-600' : 'bg-red-500'}"></span>
                            <div class="avatar">
                                <div class="w-24 rounded-xl">
                                    <img src="${post.image}" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4 w-full">
                            <div class="font-inter flex gap-4 *:opacity-50">
                                <p>#${post.category}</p>
                                <p>Author: ${post.author.name}</p>
                            </div>
                            <h3 class="font mulish text-2xl font-bold opacity-70">${post.title}</h3>
                            <p class="font-inter opacity-40">${post.description}</p>
                            <hr class="border border-dashed border-gray-300">
                            <div
                                class="text-[#12132D] text-opacity-60 flex justify-between *:font-bold [&>*:not{:last-child}]:opacity-45 font-inter">
                                <div class="flex gap-4">
                                    <div class="space-x-2 flex items-center">
                                        <i class="fa-regular fa-comment-dots"></i>
                                        <p>${post.comment_count}</p>
                                    </div>
                                    <div class="space-x-2 flex items-center">
                                        <i class="fa-regular fa-eye"></i>
                                        <p>${post.view_count}</p>
                                    </div>
                                    <div class="space-x-2 flex items-center">
                                        <i class="fa-regular fa-clock"></i>
                                        <p>${post.posted_time} Min</p>
                                    </div>
                                </div>
                                <div class="opacity-100">
                                    <button id="addToList" onclick="markAsRead('${post.description}','${post.view_count}')" data-post='${JSON.stringify(post)}'
                                        class="addToList btn btn-circle bg-green-500">
                                        <i class="fa-solid fa-envelope-open text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
    `;
        postContainer.append(div);
    });

}

// display sidebar:
const markAsRead = (description, viewCount) => {
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3 ">
                                <div class="w-11/12 lg:w-4/5 ">
                                    <p>${description}</p>
                                </div>
                                <div class="w-4/12 lg:w-1/5 flex justify-end">
                                    <p><i class="fa-regular fa-eye"></i>${viewCount}</p>
                                </div>
                            </div>
    `;
    markAsReadContainer.append(div);
    handleCount();
}
const handleCount=()=>{
    const markAsReadCounter = document.getElementById('markAsReadCounter');
    const prevCount = markAsReadCounter.innerText;
    const convertedCounter = parseInt (prevCount);
    const sum = convertedCounter + 1;
    markAsReadCounter.innerText = sum;

}

// display latest posts
const displayLatestPosts = (postsArray)=>{
    postsArray.forEach(post=>{
        const latestPostContainer = document.getElementById('latest-post-container');
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card lg:w-96 pb-5 bg-base-100      shadow-2xl">
                    <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                        <img src=${post.cover_image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="p-5 lg:p-10 space-y-4 
                       lg:space-y-5">
                        <p class="opacity-50 text-start">
                            <i class="fa-solid fa-calendar-days me-2"></i>${post.author?.posted_date || "No Publish Date"}
                        </p>
                        <h2 class="card-title text-start ">${post.title || "No Title"}</h2>
                        <p class="text-start pb-3">
                        ${post.description || "No description"}
                        </p>
                        <div class="card-actions flex gap-5 items-center">
                            <div class="avatar">
                                <div
                                    class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src=${post.profile_image} />
                                </div>
                            </div>
                            <div>
                                <h3 class="text-start font-extrabold">${post.author?.name || "Unknown"}</h3>
                                <p class="text-start opacity-60">${post.author?.designation || "Unknown"}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        latestPostContainer.append(div);
    })
}

// "cover_image": "https://i.ibb.co/VYGSkLz/pexels-jeshootscom-442576.jpg",
// "profile_image": "https://i.ibb.co/z8zx95w/pexels-davide-de-giovanni-1649675.jpg",
// "title": "Gaming Enthusiast Expert in Play",
// "description": "Leading gaming expert with a wealth of knowledge and passion for all things gaming",
// "author": {
// "name": "John Doe",
// "designation": "ROR Developer",
// "posted_date": "29 January 2024"
// }

// globally calling function
loadAllPosts();
loadLatestPosts();