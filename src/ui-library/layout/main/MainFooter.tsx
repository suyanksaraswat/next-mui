// next
import NextLink from "next/link";
// @mui
import {
	Box,
	Container,
	Divider,
	Grid,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// routes
// import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from "../../components/Logo";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";

// ----------------------------------------------------------------------

const LINKS = [
	{
		headline: "HeyLabs",
		children: [
			{ name: "About us", href: "about" },
			{ name: "Team", href: "team" },
			// { name: "FAQs", href: "PATH_PAGE.faqs" },
		],
	},
	{
		headline: "Legal",
		children: [
			{
				name: "Terms and Condition",
				href: "https://www.heyheyglobal.com/terms",
			},
			{
				name: "Privacy Policy",
				href: "https://www.heyheyglobal.com/privacypolicy",
			},
		],
	},
	{
		headline: "Contact",
		children: [
			{
				name: "hello@heyheyglobal.com",
				href: "mailto:hello@heyheyglobal.com",
			},
			// { name: "Los Angeles, 359  Hidden Valley Road", href: "#" },
		],
	},
];

const RootStyle = styled("div")(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
	return (
		<RootStyle>
			<Divider />

			<Container sx={{ pt: 10 }}>
				<Grid
					container
					justifyContent={{ xs: "center", md: "space-between" }}
					sx={{ textAlign: { xs: "center", md: "left" } }}
				>
					<Grid item xs={12} sx={{ mb: 3 }}>
						<Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
					</Grid>

					<Grid item xs={8} md={3}>
						<Typography variant="body2" sx={{ pr: { md: 5 } }}>
							Join our discord to stay in the loop with our newest
							feature releases, NFT drops, and tips and tricks for
							navigating HeyNFT.
						</Typography>

						<Stack
							direction="row"
							justifyContent={{ xs: "center", md: "flex-start" }}
							sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
							gap={2}
						>
							<a
								href="https://discord.gg/ns7tZTVhBn"
								target="_blank"
							>
								<Image
									src={`/assets/discord-white.svg`}
									alt="discord"
									width={25}
									height={25}
								/>
							</a>
							<a
								href="https://www.facebook.com/heylabs.io"
								target="_blank"
							>
								<FacebookRoundedIcon />
							</a>
							<a
								href="https://www.instagram.com/heylabs.io/"
								target="_blank"
							>
								<InstagramIcon />
							</a>
							<a
								href="https://twitter.com/HeyLabsHQ"
								target="_blank"
							>
								<TwitterIcon />
							</a>
							<a
								href="https://www.linkedin.com/company/heynft-club/"
								target="_blank"
							>
								<LinkedInIcon />
							</a>
						</Stack>
					</Grid>

					<Grid item xs={12} md={7}>
						<Stack
							spacing={5}
							direction={{ xs: "column", md: "row" }}
							justifyContent="space-between"
						>
							{LINKS.map((list) => (
								<Stack key={list.headline} spacing={2}>
									<Typography
										component="p"
										variant="overline"
									>
										{list.headline}
									</Typography>

									{list.children.map((link) => (
										<NextLink
											key={link.name}
											href={link.href}
											passHref
										>
											<Link
												color="inherit"
												variant="body2"
												sx={{ display: "block" }}
											>
												{link.name}
											</Link>
										</NextLink>
									))}
								</Stack>
							))}
						</Stack>
					</Grid>
				</Grid>

				<Typography
					component="p"
					variant="body2"
					sx={{
						mt: 10,
						pb: 5,
						fontSize: 13,
						textAlign: { xs: "center", md: "left" },
					}}
				>
					© 2022. All rights reserved
				</Typography>
			</Container>
		</RootStyle>
	);
}
