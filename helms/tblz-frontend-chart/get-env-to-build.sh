# /bin/bash
export f=values-$1.yaml;
env="../../.env";
#cat $f ;
echo "" > $env
sed -n '/env/,/envFrom/{//!p;}' $f | \
while read LINE; do
    if [[ "$LINE" =~ name.* ]];
    then
        v=${LINE:7};
        #echo "export " >> ${env} ;
        #echo "$(cat ${env})${v}" > ${env}
        echo ${v} >> ${env} ;
    else
        v=${LINE:7};
        echo "$(cat ${env})=${v}" > $env
    fi

    #echo $v  >> ${env} ;

done ;
#source $env ;
#env;
cat $env ;