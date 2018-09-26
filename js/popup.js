let app = new Vue({
  el:"#app",
  data: {
    clips:[]
  },
  methods:{
    storageUrl:function(){
      chrome.tabs.query({active: true, currentWindow:true}, function(tab){
          console.log(tab);
          let tabInfo = {
            icon:  tab[0].favIconUrl,
            url:   tab[0].url,
            title: tab[0].title
          };
          if(! this.clips.some(clip => clip.url == tabInfo.url)){
            this.clips.push(tabInfo);
            chrome.storage.local.set({clip_pages: this.clips}, ()=>{});
          }
        }.bind(this));
    },

    deleteUrl:function(url){
      this.clips = this.clips.filter(clip => clip.url !== url);
      chrome.storage.local.set({clip_pages: this.clips}, ()=>{});
    },

    moveToPage:(url)=> chrome.tabs.create({url: url})
  },
  created:function(){
    chrome.storage.local.get(['clip_pages'], (data)=>{
      this.clips = data.clip_pages;
    });
  }
});
