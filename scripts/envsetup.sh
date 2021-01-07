export LINK1URL=$(oc get ksvc/link1 -o jsonpath='{.status.url}')
export LINK2URL=$(oc get ksvc/link2 -o jsonpath='{.status.url}')
export LINK3URL=$(oc get ksvc/link3 -o jsonpath='{.status.url}')
export LINK4URL=$(oc get ksvc/link1 -o jsonpath='{.status.url}')
