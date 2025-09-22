let usersURL = "http://localhost:3000/users/"
let postsURL = "http://localhost:3000/posts/"

let section = document.getElementById("posts")
let html = ""

async function getPosts () {
        
    try{

        //On fetch toutes nos tables en route GET
        const response = await fetch(postsURL);
        const posts = await response.json();

        if (!response.ok) {
            throw new Error('Erreur d\'autorisation');
        }

        const usersResponse = await fetch(usersURL);
        const users = await usersResponse.json();

        if (!Array.isArray(users)) {
            throw new Error('Les données utilisateurs ne sont pas dans le bon format.');
        }

        // Mapping des utilisateurs par id pour un accès rapide

        const usersMap = users.reduce((map, user) => {
            map[user.id] = `${user.first_name} ${user.last_name}`;
            return map;
        }, {});
                    
        for (let i of posts) {
            let author = usersMap[i.user_id];

            html = `
            <article>
                <h3>${author}</h3>
                <p>${i.content}</p>
            </article>
            `;
            section.innerHTML += html;
            
        }
    }catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des posts: ' + error.message);
    }   
};

getPosts()