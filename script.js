// fetch data:
const loadAllPosts = async(category)=>{ 

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`: ''}`);
    const data = await response.json();
    displayAllPosts(data.posts);
}


// load post by category
const handleSearchByCategory = ()=>{
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText);
}

// display posts
const displayAllPosts =(posts)=>{
    const postContainer = document.getElementById('post-container');

    postContainer.innerHTML=''
    posts.forEach(post => {
            const div = document.createElement('div')
    div.classList = " p-6 lg:p-12 flex flex-col gap-6 lg:flex-row items-center lg:items-start bg-[#F3F3F5] rounded-3xl";
    div.innerHTML = `
    <div class="indicator">
                            <span class="indicator-item badge ${post.isActive? 'bg-green-600': 'bg-red-500'}"></span>
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
                                    <button id="addToList" onclick="markAsRead()" data-post='${JSON.stringify(post)}'
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
// globally calling function
loadAllPosts();