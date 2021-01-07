# knativechain
Demo app for chaining knative apps together, to display the spin up and spin down behaviours

# How to install
Using an OCP4.6+ cluster, install the knative-serving operator, then simply logon via oc and run the scripts/setup.sh script which precreates everything

There may be a small race condition that prohibits the exposure of the links into the demo app - if this happens (you can check after running setup.sh by doing 'env | grep LINK' and seeing if all four links are fully formed) you can run the scripts/envsetup.sh script which patches these link URLs. Then inject them into the demo using 'oc set env deployment/chaindemo LINK1URL=$LINK1URL LINK2URL=$LINK2URL LINK3URL=$LINK3URL LINK4URL=$LINK4URL -n demotest'

# How it works
The demo system creates a project called chaintest and creates four buildconfigs - these apps are microservices that return a default colour unless they have an ENV variable which overrides it. The demo system creates three revisions of the microservices with addition ENV overwrites, providing in total four microservices with three revisions for a total of 12 different colours; the traffic weighting is 40/30/30 for each microservice with different weightings per revision

Each revision is patched to timeout after 10 seconds, so the Pods will spin down 10 seconds after a request

The actual demo is a client side page that builds a virtual loom by randomly calling the microservices, four times per row, with an interval of 15 seconds. This provides a visual pciture of the colours being returned but because the interval exceeds the timeout the Pods at the backend will spin up and spin down accordingly.

The demo page provides a mechanism for starting and stopping the loom. A good way to see it in action is to have the topology page active for the chaintest project and set to display the knative services; you can then start the loom from the webpage and watch the behaviour as OCP spins up and down the appropriate Pods within a knative service based on the traffic routing.


