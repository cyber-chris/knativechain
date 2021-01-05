oc new-project chaintest
oc create -f ../yaml/link1-is.yaml
oc create -f ../yaml/link2-is.yaml
oc create -f ../yaml/link3-is.yaml
oc create -f ../yaml/link4-is.yaml
oc create -f ../yaml/link1-bc.yaml
oc create -f ../yaml/link2-bc.yaml
oc create -f ../yaml/link3-bc.yaml
oc create -f ../yaml/link4-bc.yaml
oc start-build link1
oc start-build link2
oc start-build link3
oc start-build link4
echo "Sleeping for 90 secs to allow build to complete..."
sleep 90
oc create -f ../yaml/link1-ksvc.yaml
oc create -f ../yaml/link2-ksvc.yaml
oc create -f ../yaml/link3-ksvc.yaml
oc create -f ../yaml/link4-ksvc.yaml
kn service update link1 --revision-name=v2 --env COLOUR=purple
kn service update link2 --revision-name=v2 --env COLOUR=pink
kn service update link3 --revision-name=v2 --env COLOUR=cyan
kn service update link4 --revision-name=v2 --env COLOUR=brown
kn service update link1 --revision-name=v3 --env COLOUR=#009000
kn service update link2 --revision-name=v3 --env COLOUR=#000090
kn service update link3 --revision-name=v3 --env COLOUR=#900000
kn service update link4 --revision-name=v3 --env COLOUR=#666666
kn service update link1 --traffic link1-v1=40,link1-v2=30,link1-v3=30
kn service update link2 --traffic link2-v1=30,link2-v2=40,link2-v3=30
kn service update link3 --traffic link3-v1=30,link3-v2=30,link3-v3=40
kn service update link4 --traffic link4-v1=30,link4-v2=30,link4-v3=40
export LINK1URL=$(oc get ksvc/link1 -o jsonpath='{.status.url}')
export LINK2URL=$(oc get ksvc/link2 -o jsonpath='{.status.url}')
export LINK3URL=$(oc get ksvc/link3 -o jsonpath='{.status.url}')
export LINK4URL=$(oc get ksvc/link1 -o jsonpath='{.status.url}')
