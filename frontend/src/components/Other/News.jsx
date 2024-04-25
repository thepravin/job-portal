import { useEffect, useState } from "react"
import axios from "axios";
import NewsItem from "./NewsItem";

const News = () => {

    const [newsData, setNewsData] = useState([]);

    const fetchNewsData = async () => {
        try {
            await axios.get(`https://newsapi.org/v2/everything?q=tech&apiKey=${import.meta.env.VITE_API_KEY}`)
                .then((res) => setNewsData(res?.data?.articles));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNewsData();
    }, [])

    console.log(newsData);


    return (
        <div className="mt-24 flex flex-wrap gap-8 ml-16">
        {
          newsData && newsData.map((news, index) => ( 
            (news.author !== null && news.urlToImage !== null) ? <NewsItem key={index} data={news} /> : ""
          ))
        }
      </div>
      
    )
}

export default News