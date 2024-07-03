import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import DepositArea from "@containers/deposit";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Deposit = () => (
    <Wrapper>
        <SEO pageTitle="Deposit" />
        <Header />
        <main id="main-content">
            {/* <Breadcrumb
                pageTitle="Kryptomerch Login"
                currentPage="Kryptomerch Login"
            /> */}
            < DepositArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Deposit;
