

export function filterPostHashtags(string){
   let arr = []
   const filt = []

    if(string.length > 0){
         arr = string.split(" ")
        let arrHashtags = arr.filter(word => word.startsWith("#"))

        if(arrHashtags.length > 0){
            arrHashtags = arrHashtags.join(",").split("#")
            arrHashtags = arrHashtags.filter(hashtag => {
                if(hashtag.length > 1){
                    return hashtag
                }
            })
        
            for(let hashtag of arrHashtags){
                filt.push(hashtag.replaceAll(",",""))
            }
         return filt
        }
    }
    
    return arr
        
}