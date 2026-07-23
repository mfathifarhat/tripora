import { Layout } from "../../components/Layout";

export function ItineraryPage() {
	return (
		<Layout>
			<div className="bg-slate-900 h-[103px]"></div>

			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65074.44835219153!2d112.91986523346183!3d-7.960737716108402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd637aaab794a41%3A0xada40d36ecd2a5dd!2sMt%20Bromo!5e0!3m2!1sen!2sid!4v1783739477461!5m2!1sen!2sid"
				className="w-full h-[90vh] border-0"
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="strict-origin-when-cross-origin"
			></iframe>
		</Layout>
	);
}
