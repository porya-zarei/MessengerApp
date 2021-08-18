import Link from 'next/link'

const NotFoundPage = () => {
    return ( 
        <main className="h-100 w-100">
            <section className="h-100 w-100 center">
                <div className="h-auto w-auto m-auto center">
                    Not Found | 404
                    <Link href="/">
                        <a className="btn btn-primary">Go to Home Page</a>
                    </Link>
                </div>
            </section>
        </main>
     );
}
 
export default NotFoundPage;