//function which send the data to post controller action
{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //whenever this form is submitted I dont want it to submit naturally, So we do "preventDefault()"
        newPostForm.submit(function(e){
            e.preventDefault();

            //manually submiting using ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                //sending the data for creating the post using "serialize()" : this converts the form data into "json"
                data: newPostForm.serialize(),
                success: function(data){
                    //calls the newPostDom function
                    let newPost = newPostDom(data.data.post);
                    //appending the list to "post-list-container"(home.ejs)
                    $('#post-list-container>ul').prepend(newPost); //prepend() putting at the first position
                },
                 error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(` 

        <li id="post-${post._id}">
            <p>
                <small class="delete-button">
                    <a href="/posts/destroy/${post.id}" class="delete-post-button">X</a>
                </small>

                ${post.content}
                <small class="username">
                    ${post.user.name}
                </small>
            </p>

            <div class="post-comment">

                <form action="/comments/create" method="POST">

                    <input type="text" name="content" placeholder="Type Here..." required>

                    <input type="hidden" name="post" value="${post._id}">
                    
                    <input type="submit" value="Add Comment">

                </form> 

                <div class="post-comments-list">

                    <ul id = "post-comments-${post._id}"></ul>

                </div>

            </div>

        </li>

        `)
    }



    createPost();
}