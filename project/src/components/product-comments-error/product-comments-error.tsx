type PropsType = {
  showComments: () => JSX.Element;
}

function ProductCommentsError({showComments}: PropsType) {
  //document.location.reload();
  return (
    <section className="error-comments">
      <div className="container">
        <div className="error-comments__wrapper">
          <h2 className="error-comments__title">Не удалось загрузить комментарии</h2>
          <button className="btn error-comments__button" type="button" onClick={() => showComments()}>Попробовать ещё</button>
        </div>
      </div>
    </section>
  );
}

export default ProductCommentsError;
