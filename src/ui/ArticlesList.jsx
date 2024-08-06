const ArticlesList = ({ articles, lastElementRef }) => (
  <div className="divide-y">
    {articles?.map((article, i) => (
      <a
        key={i}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        title={article.title}
        ref={lastElementRef}
        className={`grid ${
          article.image ? 'md:grid-cols-[200px_1fr]' : 'md:grid-cols-[1fr]'
        } items-center gap-6 py-6`}
      >
        {article.image && (
          <div className="aspect-video md:aspect-[3/2]">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div>
          <div className="flex flex-col gap-1 text-sm text-gray-600 md:flex-row">
            <p>{article.source},</p>
            <p>By {article.author}</p>
          </div>

          <div className="my-2 flex divide-x divide-gray-500 text-sm leading-none text-gray-600">
            <p className="pr-2 font-bold uppercase">{article.category} </p>
            <p className="pl-2">
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <h2 className="mb-1 text-xl font-bold">{article.title}</h2>
          <p className="line-clamp-2 text-sm text-gray-500" title={article.description}>
            {article.description}
          </p>
        </div>
      </a>
    ))}
  </div>
);

export default ArticlesList;
