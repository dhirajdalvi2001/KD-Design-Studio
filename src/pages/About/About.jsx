import BodyLayout from "../../components/Layout/BodyLayout";
import Typography from "../../components/Typography/Typography";
import { socials } from "../../utils/data";

const About = () => {
  return (
    <BodyLayout>
      <div className="pt-6 md:pt-16 flex flex-col md:flex-row justify-center items-center gap-10 w-[90%] md:w-3/4 mx-auto">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Typography variant="subtitle">Contact</Typography>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="caption"
                  className="cursor-pointer w-fit"
                  href="mailto:kunal@kd-studio.in"
                >
                  kunal@kd-studio.in
                </Typography>
                <div className="flex">
                  <Typography
                    variant="caption"
                    className="cursor-pointer w-fit hover:line-through"
                    href={socials.instagram}
                  >
                    instagram
                  </Typography>
                  <Typography variant="caption">&nbsp;/&nbsp;</Typography>
                  <Typography
                    variant="caption"
                    className="cursor-pointer w-fit hover:line-through"
                    href={socials.facebook}
                  >
                    facebook
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col">
                <Typography variant="caption">KD design Studio</Typography>
                <Typography variant="caption">Raigad, India</Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Typography variant="subtitle">Bio</Typography>
              <div className="flex flex-col gap-1">
                <Typography
                  variant="caption"
                  className="w-fit !text-sm text-justify"
                >
                  Kunal Dalvi, a talented architect based in Raigad, brings
                  three years of professional expertise to the table. Inspired
                  by the region&apos;s rich cultural heritage, he merges
                  tradition with modernity in his architectural creations.
                  Recently expanding his horizons, Kunal has delved into product
                  design, infusing his designs with creativity and
                  functionality. His passion for innovation and attention to
                  detail shine through in every project he undertakes. With a
                  commitment to excellence and a drive to push boundaries, Kunal
                  is poised to leave a lasting impact on the architectural and
                  product design landscape.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2"></div>
      </div>
    </BodyLayout>
  );
};

export default About;
