function FooterForm() {
    return (
        <footer className="bg-light text-center py-4 mt-5">
            <div className="container">
                <p className="mb-2">Made with ❤️ in Austin, TX</p>
                <p className="mb-2">© {new Date().getFullYear()} Harshank P. All Rights Reserved.</p>
                <p className="mb-0">
                    <a href="mailto:hashpat@protonmail.com?subject=Contact%20Request&body=Hello,%20I%20would%20like%20to%20get%20in%20touch%20with%20you." className="text-dark">
                        Contact Me
                    </a>
                    <span className="mx-2">or</span>
                    <a href="mailto:hashpat@protonmail.com?subject=Bug%20Report&body=Hello,%20I%20found%20a%20bug%20and%20would%20like%20to%20report%20it." className="text-dark">
                        Report 🐞🐛
                    </a>
                </p>
            </div>
        </footer>
    )
}


export default FooterForm;