/**
 * @param {string}text
 * @param {number}chunksize
 * @param {number}overlap
 * @returns {Array<{content:string,chunkIndex:number,pagenumber:number}}
 */
export const chunkText=(text,chunksize=500,overlap=50)=>{
    if(!text || text.trim().length===0){
      return [];
    }
    // clean text while preserving paragraph structure
    const cleanText=text
    .replace(/\r\n/g,'\n')
    .replace(/\s+/g,'')
    .replace(/\n /g,'\n')
    .replace(/ \n/g,'\n')
    .trim()


    const paragraphs=cleanText.split(/\n+/)
    .filter(p=>p.trim().length>0);

    const chunks=[];
    let currentChunks=[];
    let currentWordCount=0;
    let chunkIndex=0;

    for(const paragraph of paragraphs){
        const paragraphWords= paragraph.trim().split(/\s+ /);
        const paragraphWordCount= paragraphWords.length;
        if(paragraphWordCount >chunksize){
            if(currentChunks.length >0){
                chunks.push({
                    content:currentChunks.join('\n\n'),
                    chunkIndex: chunkIndex++,
                    pagenumber:0
                })
                currentChunks=[];
                currentWordCount=0;
            }

            // split large paragraph into words-based chunks
            for(let i=0;i<paragraphWords.length;i+=(chunksize-overlap)){
                const chunkWords=paragraphWords.slice(i,i+chunksize);
                chunks.push({
                    content:chunkWords.join(''),
                    chunkIndex: chunkIndex++,
                    pagenumber:0
                });
                if(i+chunksize >=paragraphWords.length){
                    break;
                }
            }
            continue;
        }
        if(currentWordCount + paragraphWordCount>chunksize && currentChunks.length >0){
            chunks.push({
                content:chunkWords.join('\n\n'),
                chunkIndex: chunkIndex++,
                pagenumber:0
            });
            const prevChunkText=currentChunks.join('');
            const prevWords=prevChunkText.split(/\s+/);
            const overlapText=prevChunkText.slice(-Math.min(overlap,prevWords.length)).join('');
            currentChunks=[overlapText,paragraph.trim()]
            currentWordCount=overlapText.split(/\s+/).length + paragraphWordCount;
        
        }
        else{
            currentChunks.push(paragraph.trim());
            currentWordCount+=paragraphWordCount;
        }
    }
    if(currentChunks.length >0){
        chunks.push({
            content:currentChunks.join('\n\n'),
            chunkIndex: chunkIndex,
            pagenumber:0
        });
    }
    if(chunks.length ===0 && cleanText.length > 0){
        const allwords=cleanText.split(/\s+/);
        for(let i=0;i<allwords.length;i+=(chunksize-overlap)){
            const chunkWords=allwords.slice(i,i+chunksize);
            chunks.push({
                content:chunkWords.join(''),
                chunkIndex: chunkIndex++,
                pagenumber:0
            });
            if(i+chunksize >= allwords.length) break;
           
        }
    }
    return chunks;
};


/**
 * find relavant chunks based on keyword matching
 * @param {string}query
 * @param {Aarray<Object>}chunks
 * @param {number}maxchunk
 * @returns {Aarray<Object>}
 */

export const findRelavantChunks=(chunks,query,maxchunk=3)=>{
  if(!chunks || chunks.length === 0 || !query){
    return [];
  }
  const stopwords=new Set([
    'the','is','at','which','on','a','an','and','or','but',
    'in','with','to','for','of','as','by','this','that','it'
  ]);

//   extact and clean query words
const queryWords=query
.toLowerCase()
.split(/\s+/)
.filter(w=>w.length>2 && !stopwords.has(w));

if(queryWords.length ===0){
    // return clean chunks object without mongoose metadata
    return chunks.slice(0,maxchunk).map(chunk=>({
        content:chunk.content,
        chunkIndex: chunk.chunkIndex,
        pagenumber:chunk.pagenumber,
        _id:chunk._id,
    }))
}
const scorechunks=chunks.map((chunk,index)=>{
         const content= chunk.content.toLowerCase();
         const contentWords=content.split(/\s+/).length;

         let score=0;

        //  score each query word
        for(const word of queryWords){
            const exactmatches=(content.match(
                new RegExp(`\\b${word}\\b`,'g')) || []).length;
                score+=exactmatches*3;

        // partical match(lowerscore)
        const partialmatch=(content.match(
                new RegExp(word,'g')) || []).length;
                score+=Math.max(0,partialmatch - exactmatches)*1.5;
        }
        const uniqueWordFound=queryWords.filter(word=> content.includes(word)).length;
        if(uniqueWordFound>1){
            score+=uniqueWordFound*2;
        }

        // normalize by content length
        const normalizeScore=score/Math.sqrt(contentWords);

        // small bonus for earlier chunks
        const positionBonus= 1-(index/chunk.length)*0.1;

        // return clean object without mongoose metadata
        return{
            content:chunk.content,
            chunkIndex:chunk.chunkIndex,
            pagenumber:chunk.pagenumber,
            _id:chunk._id,
            score:normalizeScore*positionBonus,
            rawscore:score,
            matchwords:uniqueWordFound,
        };
    });
    return scorechunks
    .filter(chunks=> chunks.score >0)
    .sort((a,b)=>{
        if(b.score!==a.score){
            return b.score-a.score;
        }
        if(b.matchwords!==a.matchwords){
            return b.matchwords-a.matchwords;
        }
        return a.chunkIndex-b.chunkIndex;
    })
    .slice(0,maxchunk);
}