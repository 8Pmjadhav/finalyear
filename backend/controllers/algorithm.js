

export function mergeSort(filter,posts,replies){
    let newOne = mergeCreatedAt(posts,replies);
    if(filter==2){
        newOne.sort((a,b) => b._count.likes - a._count.likes);
    }
    // console.log(newOne);
    return newOne;
}

function mergeCreatedAt(posts,replies){
    const newOne = [];

    let i=0,j=0,k=0;
    while(i < posts.length && j < replies.length){
        if(posts[i].created_At < replies[j].created_At){
            newOne[k] = replies[j];
            newOne[k].type = 'reply';
            j++;
        }
        else{
            newOne[k] = posts[i];
            newOne[k].type = 'post';
            i++;
        }
        k++;
    }

    while(i < posts.length){
        newOne[k] = posts[i++];
        newOne[k].type = 'post';
        k++;
    }

    while(j < replies.length){
        newOne[k] = replies[j++];
        newOne[k].type = 'reply';
        k++;
    }
    return newOne;
}

