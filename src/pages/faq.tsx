import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Container,
	Typography,
} from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "../ui-library/layout/Layout";

const faqData = [
	{
		title: "What is a HeyNFT?",
		description:
			"A heyNFT is digital collectible and a subscription to robust communities around the world’s leading artists, brands, and IPs.",
	},
	{
		title: "How long do my benefits last?",
		description:
			"You can enjoy your benefits till you are in possession of the NFT you purchased. Once sold, the benefits that come with these NFTs are automatically transferred to the new owner.",
	},
	{
		title: "How can I buy a HeyNFT?",
		description:
			"Select your favourite artwork and place it in your shopping cart, Check out the cart with the email you want to access them with, later on, Complete the payment in your fiat currency or with Crypto.",
	},
	{
		title: "Can I resell my HeyNFT?",
		description: "Yes, you can resell your HeyNFT whenever you want to.",
	},
	{
		title: "Where can I interact with other HeyNFT collectors?",
		description:
			"All the HeyNFT owners and potential owners can interact with one another on our Discord server. You can join the discord server.",
	},
	{
		title: "How do you know your NFT is authentic?",
		description:
			"NFT ownership is recorded on the blockchain, and your ownership will be stored on the blockchain in perpetuity. Every HeyNFT is authentic and easily verifiable on the blockchain with the NFT's unique here.",
	},
	{
		title: "What is a wallet?",
		description:
			"A wallet is the digital storage where all your NFTs are saved for you in one place to access them. If you need help setting one up, go here! https://metamask.io/download/",
	},
];

const FAQ: NextPage = () => {
	const router = useRouter();

	return (
		<Page title="HeyLabs">
			<Layout>
				<Container>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						sx={{ mt: 20, mb: 4 }}
					>
						<Typography
							variant="h2"
							textAlign="center"
							sx={{ fontFamily: "Syne" }}
						>
							Frequently Asked Questions
						</Typography>
					</Box>
					{faqData?.map((res: any, idx: number) => (
						<Accordion
							key={idx}
							sx={{
								mb: 3,
								background: "#1A1A1A",
								border: "1px solid #333333",
								borderRadius: 2,
								"& .Mui-focusVisible": {
									background: "#1A1A1A !important",
								},
							}}
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon sx={{ color: "white" }} />
								}
							>
								<Typography
									variant="h5"
									sx={{ color: "white" }}
								>
									{res?.title}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography
									variant="body1"
									sx={{ color: "gray" }}
								>
									{res?.description}
								</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Container>
			</Layout>
		</Page>
	);
};

export default FAQ;
