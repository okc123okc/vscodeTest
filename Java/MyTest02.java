import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import netscape.javascript.JSObject;

public class MyTest02 {
    public static void main(String[] args) {
        List<Map<String, Object>> listMaps = new ArrayList<Map<String, Object>>();
        Map<String, Object> map1 = new HashMap<String, Object>();
        map1.put("dataIndex", "modelId");
        map1.put("width", "100");
        map1.put("title", "模型ID");
        listMaps.add(map1);
        Map<String, Object> map2 = new HashMap<String, Object>();
        map2.put("dataIndex", "algorithm");
        map2.put("width", "100");
        map2.put("title", "算法");
        listMaps.add(map2);
        Map<String, Object> map3 = new HashMap<String, Object>();
        map3.put("dataIndex", "serve");
        map3.put("width", "100");
        map3.put("title", "服务");
        listMaps.add(map3);
        Map<String, Object> map4 = new HashMap<String, Object>();
        map4.put("dataIndex", "indexType");
        map4.put("width", "100");
        map4.put("title", "指标类型");
        listMaps.add(map4);
        Map<String, Object> map5 = new HashMap<String, Object>();
        map5.put("dataIndex", "moniEntity");
        map5.put("width", "100");
        map5.put("title", "监控实体");
        listMaps.add(map5);
        Map<String, Object> map6 = new HashMap<String, Object>();
        map6.put("dataIndex", "todayErrorNum");
        map6.put("width", "100");
        map6.put("title", "今日异常数");
        listMaps.add(map6);
        Map<String, Object> map7 = new HashMap<String, Object>();
        map7.put("dataIndex", "yesterdayErrorNum");
        map7.put("width", "100");
        map7.put("title", "昨日异常数");
        listMaps.add(map7);
        Map<String, Object> map8 = new HashMap<String, Object>();
        map8.put("dataIndex", "beforeYesterdayErrorNum");
        map8.put("width", "100");
        map8.put("title", "前天异常数");
        listMaps.add(map8);
        Map<String, Object> map9 = new HashMap<String, Object>();
        map9.put("dataIndex", "todayErrorper");
        map9.put("width", "100");
        map9.put("title", "今日异常比");
        listMaps.add(map9);
        Map<String, Object> map10 = new HashMap<String, Object>();
        map10.put("dataIndex", "yesterdayPer");
        map10.put("width", "100");
        map10.put("title", "昨日异常比");
        listMaps.add(map10);
        Map<String, Object> map11 = new HashMap<String, Object>();
        map11.put("dataIndex", "beforeYesterdayPer");
        map11.put("width", "100");
        map11.put("title", "前天异常比");
        listMaps.add(map11);
        Map<String, Object> map12 = new HashMap<String, Object>();
        map12.put("dataIndex", "trainStart");
        map12.put("width", "150");
        map12.put("title", "训练数据集开始");
        listMaps.add(map12);
        Map<String, Object> map13 = new HashMap<String, Object>();
        map13.put("dataIndex", "trainEnd");
        map13.put("width", "150");
        map13.put("title", "训练数据集结束");
        listMaps.add(map13);
        System.out.println(listMaps);
    }

}
