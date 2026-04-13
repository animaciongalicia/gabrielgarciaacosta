export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} <strong>Gabriel García Acosta</strong> · A Coruña, Galicia
          </p>
          <p className="footer-copy">
            Empecé esto con 13 años.
          </p>
        </div>
      </div>
    </footer>
  )
}
