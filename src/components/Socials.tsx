import React from "react";
import { Button } from "./ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";

function Socials() {
  return (
    <div className="flex gap-4 ">
      <Button variant="outline" size="icon">
        <Instagram />
      </Button>
      <Button variant="outline" size="icon">
        <Linkedin />
      </Button>
      <Button variant="outline" size="icon">
        <Github />
      </Button>
    </div>
  );
}

export default Socials;
