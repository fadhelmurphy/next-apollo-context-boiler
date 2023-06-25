import { GetServerSidePropsContext } from 'next';

const ssrWrapper = (getServerSidePropsFn: any) => async (context: GetServerSidePropsContext) => {

	const { req } = context;
    const userAgent: string | undefined = req.headers['user-agent'];
    const isMobile = Boolean(
        userAgent?.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
        ),
    );
	const additionalProps = await getServerSidePropsFn({
		...context,
        isMobile,
	});

	return {
		props: {
            isMobile,
			...additionalProps?.props,
		},
	};

};

export default ssrWrapper;
