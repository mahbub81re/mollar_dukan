

export const images: {image:string,title:string,sub_title:string,descrition:string}[] = [
    { 
      image:" slide-1.jpg",
      title:"North Bound",
      sub_title:"Interior Design and Builders", 
      descrition:"যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ"
    },
    {
      image:"slide-2.jpg",
      title:"North Bound",
      sub_title:"Interior Design and Builders", 
      descrition:"যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ"
    },
    {
      image:"slide-3.jpg",
      title:"North Bound",
      sub_title:"Interior Design and Builders", 
      descrition:"যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ"
    },
    {
      image:"slide-4.jpg",
      title:"North Bound",
      sub_title:"Interior Design and Builders", 
      descrition:"According to Wikipedia, a paragraph is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organise longer prose."
    }
  ]

const imageByIndex = (index: number):  {image:string,title:string,sub_title:string,descrition:string} => images[index % images.length]

export default imageByIndex
