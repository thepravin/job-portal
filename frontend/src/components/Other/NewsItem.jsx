

const NewsItem = ({ data }) => {

    const { title, urlToImage, description, url } = data



    return (<>

        <div className="max-w-xs bg-gray-100 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={urlToImage} alt="" />
            </a>
            <div className="p-4">
                <a href="#" className="text-blue-600 hover:underline">
                    <h5 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">{description}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                    Read more
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                    </svg>
                </a>
            </div>
        </div>



    </>)
}

export default NewsItem