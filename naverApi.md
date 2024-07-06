based on 카카오톡 봇 커뮤니티

-- search --


article & comment :
GET - https://apis.naver.com/cafe-web/cafe-mobile/CafeMobileWebArticleSearchListV4?cafeId=29537083&query=selinux&searchBy=0&sortBy=date&page=1&perPage=20&adUnit=MW_CAFE_BOARD&ad=true

title :
GET - https://apis.naver.com/cafe-web/cafe-mobile/CafeMobileWebArticleSearchListV4?cafeId=29537083&query=selinux&searchBy=0&sortBy=date&page=2&perPage=20&adUnit=MW_CAFE_BOARD&lastItemIndex=4&lastAdIndex=4&ad=true

author :
GET - https://apis.naver.com/cafe-web/cafe-mobile/CafeMobileWebArticleSearchListV4?cafeId=29537083&query=selinux&searchBy=1&sortBy=date&page=1&perPage=20&adUnit=MW_CAFE_BOARD&ad=true


PC search _ article & comment :
GET - https://apis.naver.com/cafe-web/cafe-articleapi/cafes/29537083/articles/42426/searches?limit=5&query=selinux&searchBy=0&sortBy=date&page=1&searchType=IN_CAFE

search cafe :
PC & Mobile - POST - 12 per page - https://apis.naver.com/cafe-home-web/cafe-home/v3/search/cafes

data -
{
  "query": "카카오톡",
  "sortBy": 0,
  "page": 1
}

-- article list --

Mobile :
GET - https://apis.naver.com/cafe-web/cafe2/ArticleListV2dot1.json?search.clubid=29537083&search.queryType=lastArticle&search.page=1&search.perPage=50&ad=false

PC :
(null)


-- cafe Info --

Mobile :
GET - https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cafeId=29537083

PC :
GET - https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cafeId=29537083
GET - https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cluburl=nameyee

Member :
GET - https://apis.naver.com/cafe-web/cafe2/CafeMemberInfo.json?cafeId=29537083


-- article Info --

Mobile :
GET - https://apis.naver.com/cafe-web/cafe-articleapi/v2/cafes/29537083/articles/ {articleId}
 - get Text :
     .result.article.contentHtml.replace(/\n/g, "").replace(/  /g,"").trim();

-- get mycafe (need login)--


cafe count : 
GET - https://apis.naver.com/cafe-home-web/cafe-home/v1/config/mycafe-counts

cafe list + discovery :
https://apis.naver.com/cafe-home-web/cafe-home/v3/home?myCafeCount=65536&articleCount=1

cafe list(PC & Mobile) :
GET - per 15 - https://apis.naver.com/cafe-home-web/cafe-home/v1/config/join-cafes/groups/?page=1
님아 ㅔ 와보셈 ㅇㄷ

-- cafe secede (탈퇴) (need login) --

GET - https://m.cafe.naver.com/CafeSecede.nhn?clubid= ${cafeId}


-- cafe join (가입) (need login) --

GET - https://apis.naver.com/cafe-web/cafe-mobile/CafeApplyView.json?cafeId= ${cafeId}

-- write * delete --


delete :
POST - https://apis.naver.com/cafe-web/cafe-mobile/ArticleDelete.json

data -
cafeId: 31116013
articleId: 61
requestFrom: A

write :
POST - https://apis.naver.com/cafe-web/cafe-editor-api/v2/cafes/29537083/menus/1/articles

data -
{
  "article": {
    "from": "mobile",
    "subject": "네이버 모듈 만들기 귀찮다..",
    "menuId": 1,
    "contentJson": "{\"document\":{\"version\":\"2.8.0\",\"theme\":\"default\",\"language\":\"ko-KR\",\"id\":\"01J232EQVZ3NCPQ2HNN1CG1TA9\",\"components\":[{\"id\":\"SE-ad7e8c1a-00c1-40de-b938-655fb67040bc\",\"layout\":\"default\",\"value\":[{\"id\":\"SE-e4b8acd6-a628-4773-9c12-3cba1349adad\",\"nodes\":[{\"id\":\"SE-e7dff082-ab4b-4b4f-a163-b4de0f0ced72\",\"value\":\"글 확인 , 카페 정보 같은 것은 다 봤는 데\",\"@ctype\":\"textNode\"}],\"@ctype\":\"paragraph\"},{\"id\":\"SE-70b0fd3b-2f5f-44e9-ae15-bfe9da2731f3\",\"nodes\":[{\"id\":\"SE-b6ee7325-78a5-4563-8274-84aa38be8bfa\",\"value\":\"  글 작성이랑 삭제가 애매한 거에요\",\"@ctype\":\"textNode\"}],\"@ctype\":\"paragraph\"}],\"@ctype\":\"text\"}],\"di\":{\"dif\":false,\"dio\":[{\"dis\":\"N\",\"dia\":{\"t\":0,\"p\":0,\"st\":0,\"sk\":0}}]}},\"documentId\":\"\"}", // content HTML value
    "tagList": [],
    
    "open": true,
    "naverOpen": true,
    "enableComment": true,
    "enableCopy": true,
    "enableScrap": true,
    "externalOpen": true,
    "useAutoSource": false,
    "cafeId": "29537083",
    "existTradeParameter": false,
    "tradeArticle": false
  }
}
